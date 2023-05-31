---
title: Setup WSL kinda Linux Box on Macbook M1 with Apple Virtualization framework
author: Suyash Mohan
tags:
  - Macbook
  - Virtualization
  - Apple Silicon
  - WSL
categories:
  - Apple Silicon
date: 2021-09-03 10:30:00
---
The moment I realized that Apple’s MacOS Big Sur has a built-in Virtualization framework that can run Linux OS, I was right away intrigued to try it out. Being a backend and DevOps developer I have some serious love for Linux OSes. But at the same time, I do have other hobbies too, like Photography, for which I prefer Photoshop and Lightroom. At the same time, I also love the new MacBook Air M1 for its hardware. Therefore being able to run Linux VM on my MacBook Air M1 with nearly native speeds, gives me the best of both worlds.

There are some third-party paid applications like Parallels and VMWare Fusion that allow you to create any kind of Virtual Machine and they are quite good at that. There is also an open-source app named UTM that uses Qemu to run Virtualised Linux instances on MacBook. Personally, I don’t need GUI, I just need a Linux terminal. So If I could set up a Linux box on MacBook like WSL (Windows Substem for Linux) on Windows 10, that will be really amazing. And actually, you can do that, with a bit of hacking around.

<!-- more -->

Apple allows to create Virtual Machines and run Linux-based operating systems but only through APIs. There is no stand-alone app. That’s not a big issue. There is an open-source tool named vftool that acts as a wrapper around these APIs so you can use it to run a Linux Virtual Machine. Bear in mind, this Virtualization framework doesn’t provide all the features that might be present on apps like Parallels. In fact, you won’t be able to run any Linux ISO right away. That’s where a bit of hacking comes around. You might also need some basic Linux knowledge. There is no GUI straight out of the box too. You can set up something like a VNC server though.

### Let’s start with Alpine Linux
Alpine Linux is great for running virtual machines as it provides a very minimal system of Linux just to run inside Virtual Machine. Alpine Linux is also great for being used as a base for containers. I am using Alpine Linux because it is fairly easy, to begin with for use with Apple’s Virtualization framework.

First, you would have to build the vftool from the source code, so you will need Xcode. But you don’t need the full version. I used `xcode-select — install` to install the basic command-line tools to compile the applications. Once you have cloned the repo you can run the make command.

```
git clone https://github.com/evansm7/vftool.git
cd vftool
make
```

You should now have vftool binary.

Next use something like Keka to extract the Alpine Linux ISO. I downloaded the aarch64 build under the Virtual category on Alpine Linux’s download page.

This should give you `vmlinuz-virt` and `initramfs-virt` under the boot folder in extracted files. vmlinuz-virt is a gzip file so we need to extract it further. Simple rename it and add .gz extension. Now you can extract it again. This will give uncompressed vmlinuz-virt. No need to extract initramfs-virt, we will use it as it is.

Now we should have three files,

1. Uncompressed kernel file aka vmlinuz-virt
2. Initial ram disk aka initramfs-virt
3. The original ISO alpine-virt-3.14.2-aarch64.iso

Now you can simply run vftool like this

```
vftool -k vmlinuz-virt -i initramfs-virt -d alpine-virt-3.14.2-aarch64.iso
```

This will give you an output like this

```
2021–09–03 12:49:33.808 vftool[3653:133705] vftool (v0.3 10/12/2020) starting
2021–09–03 12:49:33.809 vftool[3653:133705] +++ kernel at vmlinuz-virt, initrd at initramfs-virt, cmdline 'console=hvc0', 1 cpus, 512MB memory
2021–09–03 12:49:33.809 vftool[3653:133705] +++ fd 3 connected to /dev/ttys001
2021–09–03 12:49:33.809 vftool[3653:133705] +++ Waiting for connection to: /dev/ttys001
```

The important point is that you should see something like Waiting for connection to: /dev/ttys001

Now in another terminal tab, run `screen /dev/ttys001` You might see different ttys number, but that is normal. The moment you will run the screen command, you can see alpine linux’s login screen. The default user is root without any password.

So here you have it now, you can do whatever you like with your Alpine Linux. But make sure to first run `setup-alpine` command to get working internet. Do note that everything is running in memory and all changes will be gone the moment VM is stopped. We will soon see how to have a permanent setup.

The vftool allows passing additional parameters to set how many CPUs to use and how much memory to allocate. Use `-p` for processors and `-m` memory. There is an additional parameter with `-a` that allows to set up parameters to pass to the kernel and initial ramdisk when booting.

### Let’s now move on to Debian
Alpine Linux is great to get a feel and understand how the Virtualization framework works, but you might want to run something like Debian OS for some serious work.

Like I mentioned above, we can’t just take an ISO file and expect it to run like on VirtualBox or Parallels. Apple’s virtualization framework doesn’t allow GUI OS to run out of the box, so you can’t just run any Desktop distribution right away. Another issue is the virtualization framework uses Virtio as drivers for IO. So downloading cloud server images won’t work too out of the box. Luckily [Dan Fry](https://github.com/danielrfry) on GitHub has a [repo](https://github.com/danielrfry/debian-vm-aarch64) that has a build of Debian OS that comes with Virtio drivers. He also provides [scripts](https://github.com/danielrfry/debian-vm-build) that can be used to build your own Debian images for running in Virtualization framework on Apple Silicon.

From the repo, you can download vmlinuz, initrd and the rootfs tar file. Extract the rootfs tar.bz file to get something like debian-rootfs-aarch64.img

Now just run something like this

```
vftool -k vmlinuz-4.19.160 -i initrd.img-4.19.160 -d debian-rootfs-aarch64.img -a "console=hvc0 root=/dev/vda1"
```

And like the above steps, in a new terminal tab use screen to connect to the tty session. The default user is root and the password is password.

I usually like to install ssh server and kill screen sessions, then just use ssh to access my server. The image in the GitHub repo at the time of writing was Debian 10, but I was able to do a full update and upgrade it to Debian 11. You can also increase the number of Processors and Memory using the -p and -m parameters.

### Let’s try Ubuntu
We tried Alpine and Debian, but what about Ubuntu. Ubuntu is used by many people and they might feel comfortable with Ubuntu instead. Ubuntu can work too, but again with some hacking. Unlike Debian, we can actually use Ubuntu’s cloud image directly instead of depending to build it for Apple Silicon’s Virtualization framework. But the steps are going to be slightly different.

Download the ubuntu cloud server root disk image from https://cloud-images.ubuntu.com/releases/focal/release/ubuntu-20.04-server-cloudimg-arm64.tar.gz and extract it.

Then download the kernel file https://cloud-images.ubuntu.com/releases/focal/release/unpacked/ubuntu-20.04-server-cloudimg-arm64-vmlinuz-generic. This is a gzip file, so add .gz and extract kernel again.

Now finally download the initrd file https://cloud-images.ubuntu.com/releases/focal/release/unpacked/ubuntu-20.04-server-cloudimg-arm64-initrd-generic

The root disk image doesn’t have much space so you will need to expand the file. I used qemu-img utility from qemu to expand the file. I installed qemu using `brew install qemu`. But many people might find it too much to install qemu just to get a utility to expand the disk. You can instead try the dd command

```
dd if=/dev/zero of=vm/focal-server-cloudimg-arm64.img seek=20000000 obs=1024 count=0
```

Personally, I haven’t used this command, but I have seen people using it.

Now let’s run the VM as follows

```
./vftool -k vmlinuz -i initrd -d focal-server-cloudimg-arm64.img -m 2048 -a "console=hvc0"
```

We need to set `-m 2048` to increase RAM to 2GB, the default 512MB might not be enough to run Ubuntu.

Once you use the screen command, you will be put into initramfs instead of being able to use ubuntu. Now you will have to follow these commands

```
mkdir /mnt
mount /dev/vda /mnt
chroot /mnt

touch /etc/cloud/cloud-init.disabled

echo 'root:root' | chpasswd

cat <<EOF > /etc/netplan/01-dhcp.yaml
network:
  renderer: networkd
  ethernets:
    enp0s1:
      dhcp4: true
  version: 2
EOF

exit

umount /dev/vda
```

Basically, we mounted the root disk, chroot into it and disabled cloud-init. We also set default user root with the root password and configure netplan to connect to the internet. Most people also set up ssh keys to make ssh work, but I believe we can do that later on. I took these steps from the discussion done here https://github.com/evansm7/vftool/issues/2 so for those steps the credit goes to people there.

Now stop the VM by simply sending ctrl-c on the terminal running vftool and again the command as

```
./vftool -k vmlinuz -i initrd -d focal-server-cloudimg-arm64.img -m 2048 -a "console=hvc0 root=/dev/vda"
```

This time we mentioned the root device parameter. This will make us log in to Ubuntu. You can use root user to log in. Once login is done, remember to run the `resize2fs` command to actually expand the disk for usage.

```
resize2fs /dev/vda
```

Now you can set up ssh if you prefer using that. Remember to do following to make ssh work

```
echo "m1silicon" >/etc/hostname
ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N '' -t rsa
ssh-keygen -f /etc/ssh/ssh_host_dsa_key -N '' -t dsa
ssh-keygen -f /etc/ssh/ssh_host_ed25519_key -N '' -t ed25519
```

These are the steps that we skipped earlier.

There you have it, your Ubuntu Server running with near-native speed on your Macbook powered by an Apple Silicon M1 chip.

Hope you found this article helpful :)
