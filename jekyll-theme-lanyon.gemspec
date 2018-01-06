# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-lanyon"
  spec.version       = "1.1.0"
  spec.authors       = ["Mark Otto"]
  spec.email         = ["markdotto@gmail.com"]

  spec.summary       = "A reserved Jekyll theme that places the utmost gravity on content with a hidden drawer"
  spec.homepage      = "https://github.com/poole/lanyon"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r!^exe/!) { |f| File.basename(f) }

  spec.add_runtime_dependency "jekyll", "~> 3.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.1"

  spec.add_development_dependency "bundler", "~> 1.13"
  spec.add_development_dependency "rake", "~> 12.0"
end
