#!/bin/bash
set -e

# PSEUDO-CODE OVERVIEW:
# 1. Enable root access and set passwords
# 2. Create admin user with privileges
# 3. Install core packages and dependencies
# 4. Configure Hyprland desktop environment
# 5. Set up Kubernetes cluster with container runtime
# 6. Configure shared storage solutions
# 7. Deploy security stack (Siembol, TheHive, Elasticsearch)
# 8. Harden system security
# 9. Print post-install instructions

# [CONFIGURATION CONSTANTS]
USERNAME="adm"
HYPRLAND_CONFIG="/home/$USERNAME/.config/hypr"
K8S_VERSION="1.29"
POD_CIDR="10.244.0.0/16"
SERVICE_CIDR="10.96.0.0/12"
CLUSTER_NAME="homelab-csirt"
NFS_PATH="/srv/storage"

# [1. ENABLE ROOT ACCESS]
# FUNCTION: enable_root()
# PURPOSE: Allow root SSH access and set root password
enable_root() {
  # BEGIN PSEUDO-CODE
  # DISPLAY: "Setting root password"
  # RUN: passwd root (interactive)
  # MODIFY: /etc/ssh/sshd_config to allow root login
  # RESTART: sshd service
  # END PSEUDO-CODE
  
  echo -e "\n\033[1;34m==> Setting root password\033[0m"
  passwd root
  sed -i 's/^#PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config
  systemctl restart sshd
}

# [2. CREATE ADMIN USER]
# FUNCTION: create_user()
# PURPOSE: Create privileged user with sudo access
create_user() {
  # BEGIN PSEUDO-CODE
  # CREATE: New user with home directory
  # ADD: User to wheel group for sudo privileges
  # SET: ZSH as default shell
  # SET: User password interactively
  # END PSEUDO-CODE
  
  useradd -m -G wheel -s /bin/zsh $USERNAME
  echo -e "\n\033[1;34m==> Set password for $USERNAME\033[0m"
  passwd $USERNAME
}

# [3. INSTALL PACKAGES]
# FUNCTION: install_packages()
# PURPOSE: Install all required software components
install_packages() {
  # BEGIN PSEUDO-CODE
  # UPDATE: System packages
  # INSTALL: Base system utilities
  # INSTALL: Graphical environment components
  # INSTALL: Kubernetes toolchain
  # INSTALL: Security tools
  # INSTALL: Monitoring stack
  # END PSEUDO-CODE
  
  pacman -Syu --noconfirm
  pacman -S --noconfirm git base-devel curl sudo zsh nftables openssh docker containerd nfs-utils
  
  # Install AUR helper
  sudo -u $USERNAME git clone https://aur.archlinux.org/yay.git /tmp/yay
  cd /tmp/yay
  sudo -u $USERNAME makepkg -si --noconfirm

  # Graphical environment
  sudo -u $USERNAME yay -S --noconfirm hyprland waybar swaybg swaylock-effects wofi kitty \
    ttf-jetbrains-mono-nerd noto-fonts xdg-desktop-portal-hyprland

  # Kubernetes tools
  yay -S --noconfirm kubeadm-$K8S_VERSION kubectl-$K8S_VERSION kubelet-$K8S_VERSION cri-tools helm

  # Security and monitoring
  pacman -S --noconfirm fail2ban ufw
  sudo -u $USERNAME yay -S --noconfirm prometheus-stack grafana loki
}

# [4. CONFIGURE HYPRLAND]
# FUNCTION: configure_hyprland()
# PURPOSE: Set up tiling window manager environment
configure_hyprland() {
  # BEGIN PSEUDO-CODE
  # CREATE: Config directory
  # WRITE: Hyprland configuration file
  # SET: Desktop preferences
  # CONFIGURE: Input devices
  # SET: Visual effects
  # END PSEUDO-CODE
  
  mkdir -p $HYPRLAND_CONFIG
  cat > $HYPRLAND_CONFIG/hyprland.conf <<EOF
exec-once = waybar
exec-once = swaybg -i ~/wallpaper.jpg
exec-once = nm-applet

input {
  kb_layout = us
  follow_mouse = 1
}

general {
  gaps_in = 5
  gaps_out = 10
  border_size = 2
}

decoration {
  rounding = 5
  blur = true
}

animations {
  enabled = true
}

dwindle {
  pseudotile = true
}

master {
  new_is_master = true
}
EOF
  chown -R $USERNAME:$USERNAME $HYPRLAND_CONFIG
}

# [5. CONFIGURE KUBERNETES]
# FUNCTION: configure_kubernetes()
# PURPOSE: Initialize Kubernetes cluster with container runtime
configure_kubernetes() {
  # BEGIN PSEUDO-CODE
  # CONFIGURE: containerd for Kubernetes
  # SET: Kernel parameters for clustering
  # DISABLE: Swap memory
  # INITIALIZE: Kubernetes control plane
  # SETUP: User kubeconfig
  # INSTALL: Network plugin (Calico)
  # END PSEUDO-CODE
  
  containerd config default > /etc/containerd/config.toml
  sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
  systemctl enable --now containerd

  # Kernel settings
  cat <<EOF | tee /etc/sysctl.d/99-kubernetes.conf
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.max_map_count=262144
EOF
  sysctl --system

  swapoff -a
  sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

  kubeadm init \
    --control-plane-endpoint=$(hostname -I | awk '{print $1}') \
    --pod-network-cidr=$POD_CIDR \
    --service-cidr=$SERVICE_CIDR \
    --kubernetes-version=stable-$K8S_VERSION

  mkdir -p /home/$USERNAME/.kube
  cp /etc/kubernetes/admin.conf /home/$USERNAME/.kube/config
  chown -R $USERNAME:$USERNAME /home/$USERNAME/.kube

  kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/tigera-operator.yaml
  kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/custom-resources.yaml
}

# [6. CONFIGURE STORAGE]
# FUNCTION: configure_storage()
# PURPOSE: Set up shared NFS storage for cluster
configure_storage() {
  # BEGIN PSEUDO-CODE
  # CREATE: Storage directories
  # SET: Permissions for network access
  # CONFIGURE: NFS exports
  # ENABLE: NFS services
  # END PSEUDO-CODE
  
  mkdir -p $