#!/bin/bash

# Quick deployment script for CV website
# Usage: ./deploy.sh [local|build|push|server]

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

IMAGE_NAME="cv-website"
CONTAINER_NAME="cv-website"
PORT=28080

echo -e "${BLUE}🚀 CV Website Deployment Script${NC}"
echo ""

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
        echo "Visit: https://docs.docker.com/get-docker/"
        exit 1
    fi
}

# Function to run locally without Docker
run_local() {
    echo -e "${BLUE}🏠 Starting local server...${NC}"
    
    if command -v python3 &> /dev/null; then
        echo -e "${GREEN}✅ Using Python 3${NC}"
        echo -e "${GREEN}📍 Open: http://localhost:8080${NC}"
        python3 -m http.server 8080
    elif command -v python &> /dev/null; then
        echo -e "${GREEN}✅ Using Python${NC}"
        echo -e "${GREEN}📍 Open: http://localhost:8080${NC}"
        python -m http.server 8080
    elif command -v npx &> /dev/null; then
        echo -e "${GREEN}✅ Using Node.js${NC}"
        echo -e "${GREEN}📍 Open: http://localhost:8080${NC}"
        npx http-server -p 8080
    else
        echo -e "${RED}❌ No suitable web server found.${NC}"
        echo "Please install Python or Node.js"
        exit 1
    fi
}

# Function to build Docker image
build_image() {
    check_docker
    echo -e "${BLUE}🔨 Building Docker image...${NC}"
    docker build -t ${IMAGE_NAME}:latest .
    echo -e "${GREEN}✅ Build complete!${NC}"
}

# Function to run with Docker
run_docker() {
    check_docker
    
    # Stop existing container
    if docker ps -a | grep -q ${CONTAINER_NAME}; then
        echo -e "${BLUE}🛑 Stopping existing container...${NC}"
        docker stop ${CONTAINER_NAME} 2>/dev/null || true
        docker rm ${CONTAINER_NAME} 2>/dev/null || true
    fi
    
    echo -e "${BLUE}🚀 Starting Docker container...${NC}"
    docker run -d \
        --name ${CONTAINER_NAME} \
        --restart unless-stopped \
        -p ${PORT}:8080 \
        ${IMAGE_NAME}:latest
    
    echo -e "${GREEN}✅ Container started successfully!${NC}"
    echo -e "${GREEN}📍 Open: http://localhost:${PORT}${NC}"
    echo ""
    echo "Useful commands:"
    echo "  View logs:    docker logs -f ${CONTAINER_NAME}"
    echo "  Stop:         docker stop ${CONTAINER_NAME}"
    echo "  Restart:      docker restart ${CONTAINER_NAME}"
}

# Function to run with Docker Compose
run_compose() {
    check_docker
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose is not installed.${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}🚀 Starting with Docker Compose...${NC}"
    docker-compose up -d
    
    echo -e "${GREEN}✅ Service started!${NC}"
    echo -e "${GREEN}📍 Open: http://localhost:${PORT}${NC}"
    echo ""
    echo "Useful commands:"
    echo "  View logs:    docker-compose logs -f"
    echo "  Stop:         docker-compose down"
    echo "  Restart:      docker-compose restart"
}

# Function to push to registry
push_image() {
    check_docker
    
    echo -e "${BLUE}📤 Pushing to GitHub Container Registry...${NC}"
    echo "Make sure you're logged in: docker login ghcr.io"
    
    read -p "Enter your GitHub username: " username
    
    docker tag ${IMAGE_NAME}:latest ghcr.io/${username}/cv:latest
    docker push ghcr.io/${username}/cv:latest
    
    echo -e "${GREEN}✅ Push complete!${NC}"
}

# Function to deploy to server
deploy_server() {
    echo -e "${BLUE}🌐 Deploying to server...${NC}"
    
    read -p "Enter server address (user@host): " server
    read -p "Enter image name (ghcr.io/username/cv:latest): " image
    
    echo -e "${BLUE}📦 Deploying ${image} to ${server}...${NC}"
    
    ssh ${server} "
        docker pull ${image} && \
        docker stop cv-website 2>/dev/null || true && \
        docker rm cv-website 2>/dev/null || true && \
        docker run -d \
            --name cv-website \
            --restart unless-stopped \
            -p 80:8080 \
            ${image} && \
        docker image prune -af
    "
    
    echo -e "${GREEN}✅ Deployment complete!${NC}"
}

# Main menu
case "${1}" in
    local)
        run_local
        ;;
    build)
        build_image
        ;;
    run)
        build_image
        run_docker
        ;;
    compose)
        run_compose
        ;;
    push)
        push_image
        ;;
    server)
        deploy_server
        ;;
    *)
        echo "Usage: $0 [local|build|run|compose|push|server]"
        echo ""
        echo "Commands:"
        echo "  local      - Run with Python/Node (no Docker)"
        echo "  build      - Build Docker image"
        echo "  run        - Build and run with Docker"
        echo "  compose    - Run with Docker Compose"
        echo "  push       - Push image to GitHub Container Registry"
        echo "  server     - Deploy to remote server via SSH"
        echo ""
        echo "Examples:"
        echo "  $0 local       # Quick local server"
        echo "  $0 run         # Build and run in Docker"
        echo "  $0 compose     # Use Docker Compose"
        exit 1
        ;;
esac
