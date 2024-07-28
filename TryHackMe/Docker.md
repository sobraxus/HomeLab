Containerisation - Pakcaging an application and necessary resources (libs and packages) into a package (container). Created portability and hassle-free execution

Containers do not directly interact with the physical computer but the docker engine itself
AS STANDARD Containers are isolated from one another
Containers make use of "namespace" feature of the kernel so proceses can access resources of the OS without interacting with other processes
In comparison VM's require an OS oto be installed and take up large amounts of disk space

Conatiners (application/environemnt)
Docker Engine
Operating system (host)
Physical Computer

Docker Engine allows for
Connection of containers (e.g. web app and database)
Export/import of images
File transfer between OS and Container

Docker uses YAML - The reason it is portable and easy to debug

Free
Versatile - Runs on Linux, Windows and MACOS
Efficient and Minimal - Minimal ubuntu image is 100mb and containers can share an image
Easy to get started with
Easy to share - Export images
Cheap to run in comparison to VM

How does it work?
Namespaces segregate system resources such as processes away from other namespaces.
Every process on linux is assigned a namespace and a PID
Processes can only see other processes in the same namespace

Basic Docker Syntax:
Docker pull x - Downloads an latest image (add x:version to download specific version)
Docker image - Used for managing local images
- Image ls - lists the images
- Image rm X - removes specificed image

docker run - runs an image ( will dowload if not locally available)
- run -it - runs image interactively

