#!/bin/bash

# Function to check if Docker is installed
check_docker() {
  if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Installing Docker..."
    install_docker
  else
    echo "Docker is already installed."
  fi
}

# Function to install Docker
install_docker() {
  # Update the package database
  sudo apt-get update

  # Install required packages
  sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

  # Add Docker’s official GPG key
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

  # Add Docker APT repository
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

  # Update the package database with Docker packages from the newly added repo
  sudo apt-get update

  # Install Docker
  sudo apt-get install -y docker-ce

  # Add the current user to the Docker group
  sudo usermod -aG docker ${USER}

  # Enable Docker service
  sudo systemctl enable docker

  # Start Docker service
  sudo systemctl start docker

  echo "Docker installed successfully."
}

# Function to check if Docker Compose is installed
check_docker_compose() {
  if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Installing Docker Compose..."
    install_docker_compose
  else
    echo "Docker Compose is already installed."
  fi
}

# Function to install Docker Compose
install_docker_compose() {
  # Download the latest version of Docker Compose
  sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*\d')" -o /usr/local/bin/docker-compose

  # Apply executable permissions to the binary
  sudo chmod +x /usr/local/bin/docker-compose

  echo "Docker Compose installed successfully."
}

# Function to run the application
run_application() {
  echo "Running the application using Docker Compose..."
  docker-compose up --build
}

# Main script execution
check_docker
check_docker_compose
run_application