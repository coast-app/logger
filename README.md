Deprecated logger package currently only used by legacy API.

This is a simplified version of the [core API shared logger package](https://github.com/coast-app/core-api/tree/master/packages/logger).

After making changes, please follow these steps so that legacy API will pick up the changes:

- Ensure that `yarn build` was run so that `dist/logger.js` is updated
- Update the version: `npm version minor` or `npm version patch`
- Push up changes to the `master` branch
  - `git push origin master`
  - `git push --tags` (note the new tag version)
- Update the tag version for `@coast/logger` in legacy API [package.json](https://github.com/coast-app/legacy-api/blob/staging/package.json#L10)
