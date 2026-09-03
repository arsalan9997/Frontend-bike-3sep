pipeline {

    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/arsalan9997/Frontend-bike-3sep.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t bike-showroom:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop bike-showroom || true
                    docker rm bike-showroom || true

                    docker run -d \
                    --name bike-showroom \
                    -p 3000:3000 \
                    --restart unless-stopped \
                    bike-showroom:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
