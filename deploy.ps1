# Quick deployment script for CV website (PowerShell version)
# Usage: .\deploy.ps1 [local|build|run|compose|push|server]

param(
    [Parameter(Position = 0)]
    [ValidateSet('local', 'build', 'run', 'compose', 'push', 'server', 'help')]
    [string]$Action = 'help'
)

$ImageName = "cv-website"
$ContainerName = "cv-website"
$Port = 28080

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Header {
    Write-ColorOutput Cyan "🚀 CV Website Deployment Script"
    Write-Output ""
}

# Check if Docker is installed
function Test-Docker {
    if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-ColorOutput Red "❌ Docker is not installed. Please install Docker first."
        Write-Output "Visit: https://docs.docker.com/get-docker/"
        exit 1
    }
}

# Run locally without Docker
function Start-Local {
    Write-ColorOutput Cyan "🏠 Starting local server..."
    
    if (Get-Command python -ErrorAction SilentlyContinue) {
        Write-ColorOutput Green "✅ Using Python"
        Write-ColorOutput Green "📍 Open: http://localhost:$Port"
        python -m http.server $Port
    }
    elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
        Write-ColorOutput Green "✅ Using Python 3"
        Write-ColorOutput Green "📍 Open: http://localhost:$Port"
        python3 -m http.server $Port
    }
    elseif (Get-Command npx -ErrorAction SilentlyContinue) {
        Write-ColorOutput Green "✅ Using Node.js"
        Write-ColorOutput Green "📍 Open: http://localhost:$Port"
        npx http-server -p $Port
    }
    else {
        Write-ColorOutput Red "❌ No suitable web server found."
        Write-Output "Please install Python or Node.js"
        exit 1
    }
}

# Build Docker image
function Build-Image {
    Test-Docker
    Write-ColorOutput Cyan "🔨 Building Docker image..."
    docker build -t "${ImageName}:latest" .
    Write-ColorOutput Green "✅ Build complete!"
}

# Run with Docker
function Start-Docker {
    Test-Docker
    
    # Stop existing container
    $existing = docker ps -a --filter "name=$ContainerName" --format "{{.Names}}"
    if ($existing) {
        Write-ColorOutput Cyan "🛑 Stopping existing container..."
        docker stop $ContainerName 2>$null | Out-Null
        docker rm $ContainerName 2>$null | Out-Null
    }
    
    Write-ColorOutput Cyan "🚀 Starting Docker container..."
    docker run -d `
        --name $ContainerName `
        --restart unless-stopped `
        -p "${Port}:8080" `
        "${ImageName}:latest"
    
    Write-ColorOutput Green "✅ Container started successfully!"
    Write-ColorOutput Green "📍 Open: http://localhost:$Port"
    Write-Output ""
    Write-Output "Useful commands:"
    Write-Output "  View logs:    docker logs -f $ContainerName"
    Write-Output "  Stop:         docker stop $ContainerName"
    Write-Output "  Restart:      docker restart $ContainerName"
}

# Run with Docker Compose
function Start-Compose {
    Test-Docker
    
    if (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
        Write-ColorOutput Red "❌ Docker Compose is not installed."
        exit 1
    }
    
    Write-ColorOutput Cyan "🚀 Starting with Docker Compose..."
    docker-compose up -d
    
    Write-ColorOutput Green "✅ Service started!"
    Write-ColorOutput Green "📍 Open: http://localhost:$Port"
    Write-Output ""
    Write-Output "Useful commands:"
    Write-Output "  View logs:    docker-compose logs -f"
    Write-Output "  Stop:         docker-compose down"
    Write-Output "  Restart:      docker-compose restart"
}

# Push to registry
function Push-Image {
    Test-Docker
    
    Write-ColorOutput Cyan "📤 Pushing to GitHub Container Registry..."
    Write-Output "Make sure you're logged in: docker login ghcr.io"
    
    $username = Read-Host "Enter your GitHub username"
    
    docker tag "${ImageName}:latest" "ghcr.io/${username}/cv:latest"
    docker push "ghcr.io/${username}/cv:latest"
    
    Write-ColorOutput Green "✅ Push complete!"
}

# Deploy to server
function Deploy-Server {
    Write-ColorOutput Cyan "🌐 Deploying to server..."
    
    $server = Read-Host "Enter server address (user@host)"
    $image = Read-Host "Enter image name (ghcr.io/username/cv:latest)"
    
    Write-ColorOutput Cyan "📦 Deploying $image to $server..."
    
    $script = @"
docker pull $image && \
docker stop cv-website 2>/dev/null || true && \
docker rm cv-website 2>/dev/null || true && \
docker run -d \
    --name cv-website \
    --restart unless-stopped \
    -p 80:8080 \
    $image && \
docker image prune -af
"@
    
    ssh $server $script
    
    Write-ColorOutput Green "✅ Deployment complete!"
}

# Show help
function Show-Help {
    Write-Output "Usage: .\deploy.ps1 [local|build|run|compose|push|server]"
    Write-Output ""
    Write-Output "Commands:"
    Write-Output "  local      - Run with Python/Node (no Docker)"
    Write-Output "  build      - Build Docker image"
    Write-Output "  run        - Build and run with Docker"
    Write-Output "  compose    - Run with Docker Compose"
    Write-Output "  push       - Push image to GitHub Container Registry"
    Write-Output "  server     - Deploy to remote server via SSH"
    Write-Output ""
    Write-Output "Examples:"
    Write-Output "  .\deploy.ps1 local       # Quick local server"
    Write-Output "  .\deploy.ps1 run         # Build and run in Docker"
    Write-Output "  .\deploy.ps1 compose     # Use Docker Compose"
}

# Main execution
Write-Header

switch ($Action) {
    'local' {
        Start-Local
    }
    'build' {
        Build-Image
    }
    'run' {
        Build-Image
        Start-Docker
    }
    'compose' {
        Start-Compose
    }
    'push' {
        Push-Image
    }
    'server' {
        Deploy-Server
    }
    default {
        Show-Help
    }
}
