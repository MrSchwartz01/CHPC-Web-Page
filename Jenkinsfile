pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-18" // Configurar en Jenkins Global Tool Configuration
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/MrSchwartz01/CHPC-Web-Page'
            }
        }
        
        stage('Install Frontend') {
            steps {
                dir('Pagina Refactorizada/frontend-chpc') {
                    bat 'npm install'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                dir('Pagina Refactorizada/frontend-chpc') {
                    bat 'npm run lint'
                    // bat 'npm run test' // Cuando tengas tests
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('Pagina Refactorizada/frontend-chpc') {
                    bat 'npm run build'
                }
            }
        }
        
        stage('Install Backend') {
            steps {
                dir('Pagina Refactorizada/frontend-chpc/backend') {
                    bat 'npm install'
                    bat 'npx prisma generate'
                    bat 'npx prisma db push'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                dir('Pagina Refactorizada/frontend-chpc/backend') {
                    bat 'npm run lint'
                    bat 'npm run test'
                    bat 'npm run test:e2e'
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('Pagina Refactorizada/frontend-chpc/backend') {
                    bat 'npm run build'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Build exitoso!'
        }
        failure {
            echo '❌ Build falló!'
        }
    }
}