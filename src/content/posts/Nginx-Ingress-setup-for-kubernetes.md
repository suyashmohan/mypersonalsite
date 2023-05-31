---
title: Nginx Ingress setup for kubernetes
author: Suyash Mohan
tags:
  - Kubernetes
  - Containers
categories:
  - Kubernetes
date: 2020-01-22 22:44:00
---
Recently I decided to give Kubernetes a try. I was avoiding it just for the reason of writing several long YAML files. I know I am a lazy guy. But once you get used to writing Kubernetes code, you discover the power of it. You do have to write a docker-compose file in the world of Docker but I have found writing YAML for Kubernetes more tedious but it might be worth it once you understand what more you can do with Kubernetes.

Like everyone the first thing I learned in Kubernetes is to create a deployment that serves a website and created a service around it. The first question that came in my mind afterward is how I can host 2 websites and route the traffic to them based on hostnames. Traditionally you would install something like NGINX and configure it to serve different websites or forward the requests to some other service. We can still use Nginx to route our request in Kubernetes but in a different way, by using Ingress.
<!-- more -->
In this article, we will have a look at Nginx Ingress Controller. Using this we can easily divert traffic based on hostnames inside our Kubernetes cluster essentially allowing us to host multiple projects on a single cluster. Isn't it cool? Let me know in the comments if I am overselling it.

To test it out we will need to install and enable Nginx Ingress Controller. We will be using Minikiube to test on our local machine.

```
$ minikube addons enable ingress
```

Before we set up our Ingress controller we will need to set up deployments with corresponding services. Let's Create a sample deployment and a service.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: first-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: first-deployment
  template:
    metadata:
      labels:
        app: first-deployment
    spec:
      containers:
      - name: hello-kubernetes
        image: paulbouwer/hello-kubernetes:1.5
        ports:
          - containerPort: 8080
        env:
        - name: MESSAGE
          value: Hello from first Deployment
---
apiVersion: v1
kind: Service
metadata:
  name: first-deployment
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: first-deployment
```

Similarly, let's create one more deployment just by replacing the word 	`first` in the above text with the word `second`. Being lazy sometimes does save some time. If you are too lazy to type that also, then you can find the code in my repo https://github.com/suyashmohan/simple_kubernetes_ingress_sample

In case you are new to Kubernetes, you can deploy above YAML by using

```
kubectl apply -f first-deployment.yml
kubectl apply -f second-deployement.yml
```

You can check if everything is running fine by using

```
kubectl get pods
kubectl get deployments
kubectl get services
```

If everything is looking fine let's continue and setup our Ingress controllers. If you are stuck at any error, you can comment below and I will try to help you out.

Setting up Ingress is pretty easily

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: test-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
  - host: first.info
    http:
      paths:
      - path: /
        backend:
          serviceName: first-deployment
          servicePort: 8080
  - host: second.info
    http:
      paths:
      - path: /
        backend:
          serviceName: second-deployment
          servicePort: 8080
```
Here we have defined a resource with kind of Ingress. The specifications for this resource includes rules which defines how traffic should be diverted to different services based on host. For e.g. if a request comes for first.info with root path, we will forward the request to first-deployment at port 8080. Same goes for second.info

Apply the above ingress resource 

```
$ kubectl apply -f ingress.yml
```

Get the address for Ingress controller as following
```
$ kubectl get ingress
NAME           HOSTS                    ADDRESS         PORTS   AGE
test-ingress   first.info,second.info   192.168.39.98   80      57s
```

One advantage of Ingress is that it exposes the controller, so you don't have to expose the services to the world. Testing this setup is also pretty easy.

We can either set up these hosts in /etc/host/ pointing to local address or we can just Host header in curl to test it out.

```
$ curl -H 'Host:first.info' http://192.168.39.98
$ curl -H 'Host:second.info' http://192.168.39.98
```

That's it we have set up 2 services that get traffic based on Hostnames using Nginx Ingress Controller. I hope this article was helpful. Please share your thoughts and doubts using the comments below.
