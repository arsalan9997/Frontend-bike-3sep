pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "tops069/bike-showroom"
        DOCKER_CREDENTIALS = "dockerhub-creds"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'

                git branch: 'main',
                    url: 'https://github.com/arsalan9997/Frontend-bike-3sep.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Build React Application') {
            steps {
                echo 'Building React application...'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'

                sh """
                    docker build \
                    -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                    -t ${DOCKER_IMAGE}:latest \
                    .
                """
            }
        }

        stage('Docker Login') {
            steps {
                echo 'Logging in to Docker Hub...'

                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKER_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                        -u "$DOCKER_USERNAME" \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'

                sh """
                    docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    docker push ${DOCKER_IMAGE}:latest
                """
            }
        }

        stage('Docker Logout') {
            steps {
                echo 'Logging out from Docker Hub...'
                sh 'docker logout'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying application to EC2...'

                sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@100.54.69.23"
                        docker pull tops069/bike-showroom:latest &&
                        docker stop bike-showroom || true &&
                        docker rm bike-showroom || true &&
                        docker run -d \
                            --name bike-showroom \
                            -p 3000:3000 \
                            --restart unless-stopped \
                            tops069/bike-showroom:latest
                    "
                '''
            }
        }
    }

    post {

        success {
            echo '========================================='
            echo '   BIKE SHOWROOM PIPELINE SUCCESSFUL'
            echo '========================================='
            echo "Docker Image: ${DOCKER_IMAGE}:latest"
            echo "Build Number: ${BUILD_NUMBER}"
            echo 'Application deployed successfully!'
        }

        failure {
            echo '========================================='
            echo '   BIKE SHOWROOM PIPELINE FAILED'
            echo '========================================='
        }

        always {
            echo "Jenkins Build: ${BUILD_NUMBER}"
        }
    }
}
