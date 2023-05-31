---
title: Setup Databases like PostgreSQL inside Kubernetes cluster
author: Suyash Mohan
tags:
  - Kubernetes
  - Containers
  - Postgresql
  - Database
categories:
  - Kubernetes
date: 2020-01-27 10:30:00
---
Kubernetes is getting a lot of traction in the world of DevOps for hosting stateless microservices. But what about Stateful applications like Databases? It's been a topic of debate when it comes to hosting databases on Kubernetes or even docker for production environments. Thankfully Kubernetes does have a special resource that can be used for setting applications like Databases. I am talking about Statefulsets.

StatefulSets are like deployment resources but they are special in the sense that Kubernetes maintains a persistent identifier for the pods and hence these pods are not interchangeable. This helps when running stateful applications.

To learn more about this, we will set up a Postgres database inside Kubernetes. Although we are using Postgres the concepts and steps are the same for any databases like MySQL, etc.

<!-- more -->

In order to set up this configuration, we will need to set up the following resources:

1. Storage Class
2. Persistent Volume
3. Persistent Volume Claim
4. Stateful Set
5. Config Map
6. Service

Since the data is persistent we don't want to save our data inside the container's storage. Instead, we want to mount external storage inside the Pod. In this way even if Pod dies, our data stays safe. Kubernetes has the concept of Persistent Volume and Persistent Volume Claim. To explain in simple terms, we need to claim a volume so that it belongs to us and we don't end having two pods writing to the same storage. PersistentVolume defines these external storage volumes. Then PersistentVolumeClaims is a way to claim these storage volumes. A Persistent volume also needs to define what kind of Storage Class it needs. In Kubernetes, these storage volumes could be anything. It could be EBS in AWS or a local folder or any other block storage in other cloud providers. Hence we define a Storage Class with specific provisioner.

For this setup, I used microk8s. You can install it on Ubuntu by simply using snap

```
$ sudo snap install microk8s --classic --edge
```

The following code is also available at my [Github Repo](https://github.com/suyashmohan/kubernetes_postgres_statefulset)

Let's define a Storage Class that uses the provisioner provided by microk8s. It is essentially local storage already set up inside micro8ks.

```
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: microk8s-hostpath
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: microk8s.io/hostpath
```

Now we need to define PersistentVolume that will use this Storage Class and following it we also define PersistenVolumeClaim to claim this volume

```
kind: PersistentVolume
apiVersion: v1
metadata:
  name: postgres-pv
  labels:
    app: postgres
    type: local
spec:
  storageClassName: microk8s-hostpath
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/var/data"

---

kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: postgres-pv-claim
  labels:
    app: postgres
spec:
  storageClassName: microk8s-hostpath
  capacity:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

Since we are using a local disk provisioner  we need to define where on host node our data will be saved. Here we choose `/var/data/`. Another important parameter is `accessMode`. Here we choose `ReadWriteOnce`. This will make sure only one pod can write at a time. So, no two pods end up with this volume for writing. We can also define what should be the size of this volume, which we choose 5Gb.

Next, we will setup ConfigMap. They are just an easy way to provide configuration for our setup. The advantage is we can get the values like username and password by different means for example Environment Variables making sure we don't end up saving passwords in our code. To keep this example simple we have hardcoded the values inside ConfigMap.

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: postgres-configuration
  labels:
    app: postgres
data:
  POSTGRES_DB: awesomedb
  POSTGRES_USER: amazinguser
  POSTGRES_PASSWORD: perfectpassword
```

Now we have our Configs and Storage Volume, we can define our StatefulSet that will use these,

```
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres-statefulset
  labels:
    app: postgres
spec:
  serviceName: "postgres"
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:12
        envFrom:
        - configMapRef:
            name: postgres-configuration
        ports:
        - containerPort: 5432
          name: postgresdb
        volumeMounts:
        - name: pv-data
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: pv-data
        persistentVolumeClaim:
          claimName: postgres-pv-claim
```

The definition for Stateful Set is pretty much the same as Deployments. Here we have added two additional things. One we defined to load environment variables inside pod from the config map we defined earlier. Second the most important change, we defined our volume that will map to /var/lib/PostgreSQL/data inside our pod. This volume is defined using the persistent volume claim we used earlier.

Lastly, we can define a service resource to expose our database.

```
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  labels:
    app: postgres
spec:
  ports:
  - port: 5432
    name: postgres
  type: NodePort 
  selector:
    app: postgres
```

To test these files, simply apply the files. Best to apply ConfigMap and Storage YAMLs first.

```
$ sudo microk8s.kubectl apply -f file.yml
```

You can check if everything is okay by using
```
$ sudo microk8s.kubectl get storageclass
$ sudo microk8s.kubectl get persistentvolume
$ sudo microk8s.kubectl get persistentvolumeclaim
$ sudo microk8s.kubectl get configmap
$ sudo microk8s.kubectl get statefulset
$ sudo microk8s.kubectl get service
```

If persistent volume claim gets stuck waiting, the stateful set will also get stuck as it can't get its storage. So make sure both StorageClass and PersistentVolume are created properly.

If you are using Minikube, you might want to change the provisioner in StorageClass. Similarly, you can change it to EBS, etc for production setup.

This was an essential setup of all resources needed to host something like PostgreSQL databases. The same steps can be followed and used with MySQL, MongoDB or any other stateful application. If you have any doubts or thought do share it through the comments.