pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    environment {
        CI = 'true'
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-21.0.11'
        PATH = "${JAVA_HOME}\\bin;${env.PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Pulling latest code from the target repository branch...'
                checkout scm
            }
        }

        stage('Clean Workspace') {
            steps {
                echo 'Removing stale test and report results...'
                bat '''
                    if exist test-results rmdir /s /q test-results
                    if exist playwright-report rmdir /s /q playwright-report
                    if exist allure-results rmdir /s /q allure-results
                    if exist allure-report rmdir /s /q allure-report
                '''
            }
        }

        stage('Verify Java') {
            steps {
                echo 'Verifying Java installation required by Allure...'
                bat 'java -version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'
            }
        }

        stage('Install Playwright Chromium') {
            steps {
                echo 'Installing Playwright Chromium browser...'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executing passing Playwright tests on Chromium...'
                bat 'npx playwright test --project=chromium --grep-invert "Intentional Cart Failure"'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo 'Generating Allure HTML report...'
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

       stage('Publish Reports') {
    steps {
        echo 'Publishing Playwright HTML report and Allure HTML report...'

        publishHTML(target: [
            reportName: 'Playwright HTML Report',
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: false
        ])

        publishHTML(target: [
            reportName: 'Allure HTML Report',
            reportDir: 'allure-report',
            reportFiles: 'index.html',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: false
        ])
    }
}
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving test reports and diagnostic artifacts...'

                archiveArtifacts(
                    artifacts: 'playwright-report/**, allure-report/**, test-results/**/*.png, test-results/**/*.webm, test-results/**/*.zip',
                    allowEmptyArchive: true,
                    fingerprint: true
                )
            }
        }
    }

    post {
        always {
            echo 'Post-build cleanup...'
            bat '''
                if exist node_modules\\.cache rmdir /s /q node_modules\\.cache
            '''
        }

        success {
            echo 'BUILD SUCCESSFUL - Playwright and Allure reports are available.'
        }

        failure {
            echo 'BUILD FAILED - Check the Jenkins console output and archived artifacts.'
        }
    }
}