pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "tops069/bike-showroom"
        DOCKER_CREDENTIALS = "dockerhub-creds"

        EC2_USER = "ubuntu"
        EC2_HOST = "100.54.69.23"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '===== CHECKOUT ====='

                git branch: 'main',
                    url: 'https://github.com/arsalan9997/Frontend-bike-3sep.git'
            }
        }


        stage('Install Dependencies') {
            steps {
                echo '===== INSTALL DEPENDENCIES ====='

                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }


        stage('Build React Application') {
            steps {
                echo '===== BUILD REACT APPLICATION ====='

                sh 'npm run build'

                sh 'ls -la'
                sh 'ls -la dist'
            }
        }


        stage('Docker Build') {
            steps {
                echo '===== DOCKER BUILD ====='

                sh """
                    docker build \
                    -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                    -t ${DOCKER_IMAGE}:latest \
                    .
                """

                sh 'docker images | grep bike-showroom'
            }
        }


        stage('Docker Login') {
            steps {
                echo '===== DOCKER HUB LOGIN ====='

                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKER_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                        --username "$DOCKER_USERNAME" \
                        --password-stdin
                    '''
                }
            }
        }


        stage('Docker Push') {
            steps {
                echo '===== PUSHING TO DOCKER HUB ====='

                sh """
                    docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    docker push ${DOCKER_IMAGE}:latest
                """
            }
        }


        stage('Docker Logout') {
            steps {
                echo '===== DOCKER LOGOUT ====='

                sh 'docker logout'
            }
        }


        stage('Deploy to EC2') {
            steps {
                echo '===== DEPLOYING TO EC2 ====='

                sh """
                    ssh -o StrictHostKeyChecking=no \
                    ${EC2_USER}@${EC2_HOST} '
                        docker pull ${DOCKER_IMAGE}:latest &&
                        docker stop bike-showroom || true &&
                        docker rm bike-showroom || true &&
                        docker run -d \
                            --name bike-showroom \
                            -p 3000:3000 \
                            --restart unless-stopped \
                            ${DOCKER_IMAGE}:latest
                    '
                """
            }
        }


        stage('Verify Deployment') {
            steps {
                echo '===== VERIFYING DEPLOYMENT ====='

                sh """
                    ssh -o StrictHostKeyChecking=no \
                    ${EC2_USER}@${EC2_HOST} '
                        echo "===== CONTAINER STATUS ====="
                        docker ps --filter name=bike-showroom

                        echo "===== LOCAL APPLICATION TEST ====="
                        curl -I http://localhost:3000
                    '
                """
            }
        }
    }


    post {

        success {
            echo '''
=========================================
     BIKE SHOWROOM CI/CD SUCCESS
=========================================
'''
            echo "Docker Image: ${DOCKER_IMAGE}:latest"
            echo "Build Number: ${BUILD_NUMBER}"
            echo "Application: http://${EC2_HOST}:3000"
            echo 'Deployment completed successfully!'
        }


        failure {
            echo '''
=========================================
     BIKE SHOWROOM CI/CD FAILED
=========================================
'''
            echo "Build Number: ${BUILD_NUMBER}"
            echo 'Please check the failed stage and console output.'
        }


        always {
            echo "Jenkins Build: ${BUILD_NUMBER}"
        }
    }
}
