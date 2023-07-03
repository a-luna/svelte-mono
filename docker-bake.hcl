target "portfolio" {
    dockerfile = "./apps/portfolio/Dockerfile"
    contexts = {
        app = "./apps/portfolio"
        base = "."
    }
    tags = ["portfolio:latest"]
}