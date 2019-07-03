export default ({ router }) =>
  router.beforeEach(async (to, _, next) => {
    if (to.name === 'post') to.meta.breadcrumbs[2] = { label: `Article ${to.params.id}` };
    return next();
  });
