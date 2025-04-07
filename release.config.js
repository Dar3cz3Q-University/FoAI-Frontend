module.exports = {
  branches: ["master"],
  tagFormat: 'v${version}',
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "echo ${nextRelease.version} > ../version && echo '{\"schemaVersion\": 1, \"label\": \"version\", \"message\": \"v${nextRelease.version}\", \"color\": \"blue\"}' > ../docs/version.json"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "version",
          "docs/version.json",
          "src/package.json"
        ],
        "message": "chore(release): ${nextRelease.version} [skip ci]"
      }
    ]
  ],
  pkgRoot: 'src'
}
