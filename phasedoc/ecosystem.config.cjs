module.exports = {
  apps: [{
    name: 'phasedoc-aerotrack',
    script: 'D:/oar/phasedoc/cockpit.mjs',
    cwd: __dirname,
    env: {
      PHASEDOC_DB: `${__dirname}/tasks.json`,
      PHASEDOC_PLAN: `${__dirname}/PLAN.md`,
      PHASEDOC_ARCH: `${__dirname}/ARCHITECTURE.md`,
      PHASEDOC_RESOURCES: `${__dirname}/resources.json`,
      PHASEDOC_EXPLAINERS: `${__dirname}/explainers.json`,
      PHASEDOC_PROGRESS: `${__dirname}/PROGRESS.md`,
      PHASEDOC_TITLE: 'Aerotrack phasedoc',
      PHASEDOC_SUBTITLE: 'Worldwide live aeroplane tracker build arc',
      PHASEDOC_PORT: '7901',
    },
  }],
}
