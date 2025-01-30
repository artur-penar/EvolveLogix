#!/bin/bash

# Function to check if Docker is installed
check_docker() {
  if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker before running this script."
    exit 1
  else
    echo "Docker is already installed."
  fi
}

# Function to check if Docker Compose is installed
check_docker_compose() {
  if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose before running this script."
    exit 1
  else
    echo "Docker Compose is already installed."
  fi
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