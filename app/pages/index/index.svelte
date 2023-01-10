<script lang="ts">
    import Router from 'svelte-spa-router';
    import routes from '@app/routes/pages';
    import '../../../node_modules/bulma-extensions/dist/js/bulma-extensions.min';
    import './index';
</script>

<Router {routes} />

<style lang="scss" global>
    @import '../../../node_modules/bulma/css/bulma';
    @import '../../../node_modules/bulma-extensions/dist/css/bulma-extensions.min';
    @import './index.scss';
</style>
