# Contributing

Open an issue for a bug or proposed change. Include the Home Assistant version and use fictional entities in examples and screenshots.

Create a branch and edit `themes/amazing.yaml`, the source of the theme colors. With Node.js 24 installed, run:

```sh
npm ci --ignore-scripts
npm run preview:build
npm run validate
```

Review the generated preview and contrast report. Update screenshots if appearance changes, and document live Home Assistant testing separately from preview testing.

Submit a pull request to `main`. Both `Theme validation` and `HACS validation` must pass on an up-to-date branch, and review conversations must be resolved. A second person's approval is not required for this single-maintainer project. Merge using squash; force pushes and deletion of `main` are blocked. Release tags beginning with `v` cannot be changed or deleted.

See [the release guide](docs/RELEASING.md) for publishing and [the security policy](SECURITY.md) for private vulnerability reports.
