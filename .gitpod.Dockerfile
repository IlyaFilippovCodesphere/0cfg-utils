FROM gitpod/workspace-full

# Install kubectl from Docker Hub.
COPY --from=lachlanevenson/k8s-kubectl:v1.10.3 /usr/local/bin/kubectl /usr/local/bin/kubectl
