FROM node@sha256:ed0e340edf19b7014fd6b0a5f7048b73826b6ae6104132184243f9422b1e9957

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /action

COPY \
dist/semantic-release-plugin-github-action.js \
@mnrendra/semantic-release-plugin-github-action/index.js

COPY \
package.json \
package-lock.json \
dist/index.js \
.

RUN \
apt-get update -qq && \
apt-get install -y --no-install-recommends -qq ca-certificates git gnupg && \
npm ci --production --silent && \
npm cache clean --force --silent && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* ~/.npm/_cacache

ENTRYPOINT ["node", "/action/index.js"]
