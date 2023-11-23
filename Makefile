build-auth: 
	@docker buildx build --platform linux/amd64,linux/arm64 -t nvkhiem2016/auth-service -f devOps/docker/auth.dockerfile . --push
build-user-gateway: 
	@docker buildx build --platform linux/amd64,linux/arm64 -t nvkhiem2016/user-gateway-service -f devOps/docker/user-gateway.dockerfile . --push