# Stop Minikube
minikube stop

# Delete minikube
# minikube delete

# Delete Config Files and folders
# sudo rm -rf /etc/kubernetes/
# sudo rm -rf /var/lib/kubelet/
# sudo rm -rf /var/lib/etcd
# rm -rf ~/.kube ~/.minikube
# docker system prune -af --volumes

# Update minikube config
minikube config set driver virtualbox
minikube config set memory 4096
minikube config set disk-size 40g

# Minikube Start
minikube start --mount=true --mount-string=./cluster-data:/cluster-data

# Enable Ingress
minikube addons enable ingress