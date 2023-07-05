target "portfolio" {
    dockerfile = "./apps/portfolio/Dockerfile"
    contexts = {
        project = "./apps/portfolio"
        root = "."
    }
    tags = ["ghcr.io/a-luna/portfolio:latest"]
}