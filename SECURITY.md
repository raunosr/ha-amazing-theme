# Security policy

Security fixes target the latest published release. Update through HACS or replace the theme file manually.

Report suspected vulnerabilities privately through [GitHub's vulnerability reporting form](https://github.com/raunosr/ha-amazing-theme/security/advisories/new). Include the affected version, impact and reproduction steps. Do not include Home Assistant access tokens, passwords, personal configuration or screenshots containing private information.

For visual defects and compatibility problems, open a normal issue with your Home Assistant version and a minimal example using fictional entities.

The installable theme is YAML containing CSS values. It does not require JavaScript, card-mod, external assets or network requests. Node.js and npm dependencies are used only to develop and validate the repository. The offline HTML preview contains local demonstration JavaScript and is not installed by HACS.

Repository safeguards include required pull requests and validation for `main`, protected release tags, read-only workflow permissions, secret scanning, push protection and Dependabot. GitHub Actions references are pinned to commits; the upstream HACS action manages its own validator container.
