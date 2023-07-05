target "portfolio" {
    dockerfile = "./apps/portfolio/Dockerfile"
    contexts = {
        project = "./apps/portfolio"
        root = "."
    }
    tags = ["ghcr.io/a-luna/portfolio:latest"]
    args: {
        API_KEY=${API_KEY}
        WAKATIME_API_KEY=${WAKATIME_API_KEY}
    }
}