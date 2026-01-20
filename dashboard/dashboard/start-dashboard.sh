#!/bin/bash

# Vytal Dashboard Launcher
# This script starts both the frontend and backend servers

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║        🌿 VYTAL HEALTH DASHBOARD                          ║"
echo "║        Your journey to better health starts here          ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is not installed${NC}"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    # Kill all background processes
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Install frontend dependencies if needed
echo -e "${BLUE}📦 Checking frontend dependencies...${NC}"
cd "$SCRIPT_DIR/frontend"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies (this may take a minute)...${NC}"
    npm install
fi

# Install backend dependencies if needed
echo -e "${BLUE}📦 Checking backend dependencies...${NC}"
cd "$SCRIPT_DIR/backend"
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv .venv
fi

source .venv/bin/activate
pip install -q -r requirements.txt

# Start backend server
echo -e "${BLUE}🚀 Starting backend server on port 8080...${NC}"
cd "$SCRIPT_DIR/backend"
python main.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend server
echo -e "${BLUE}🚀 Starting frontend server on port 3000...${NC}"
cd "$SCRIPT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!

# Wait a moment for servers to initialize
sleep 3

echo -e "${GREEN}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "  ✅ Dashboard is running!"
echo ""
echo "  🌐 Frontend: http://localhost:3000"
echo "  🔌 Backend:  http://localhost:8080"
echo ""
echo "  📖 Open http://localhost:3000 in your browser"
echo ""
echo "  Press Ctrl+C to stop all servers"
echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${NC}"

# Wait for user to stop
wait

