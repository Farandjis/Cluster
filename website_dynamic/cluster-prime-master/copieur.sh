#!/bin/bash

# Vérifier si un argument est passé
if [ -z "$1" ]; then
  echo "Usage: $0 <script.py>"
  exit 1
fi

# Nom du script à copier
SCRIPT=$1

# Adresses IP des Pi Zero
PI_ZERO_IPS=("172.19.181.1" "172.19.181.2" "172.19.181.3" "172.19.181.4")

# Dossier de destination sur les Pi Zero
DEST_DIR="/home/moi/cluster-prime-master"

# Copier le script vers chaque Pi Zero
for IP in "${PI_ZERO_IPS[@]}"; do
  scp "$SCRIPT" "moi@$IP:$DEST_DIR"
  if [ $? -eq 0 ]; then
    echo "Successfully copied $SCRIPT to $IP:$DEST_DIR"
  else
    echo "Failed to copy $SCRIPT to $IP:$DEST_DIR"
  fi
done