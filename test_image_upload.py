#!/usr/bin/env python3
"""
Simple test script to verify image upload functionality
"""
import asyncio
import httpx
from fastapi.testclient import TestClient
from app.main import app

def test_image_upload_endpoint():
    """Test that the image upload endpoint exists and requires authentication"""
    client = TestClient(app)
    
    # Test without authentication
    response = client.post("/upload/image")
    assert response.status_code == 401
    
    print("✅ Image upload endpoint exists and requires authentication")

def test_health_endpoint():
    """Test that the health endpoint works"""
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "MCP Operational"
    print("✅ Health endpoint works")

if __name__ == "__main__":
    test_health_endpoint()
    test_image_upload_endpoint()
    print("🎉 All tests passed!") 