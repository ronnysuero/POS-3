Ext.define('POS.store.Stock', {
    extend: 'Ext.data.Store',
    model: 'POS.model.Stock',

    remoteSort: true,
    pageSize: 100,

    sorters: [{
        property: 'product',
        direction: 'ASC'
    }],

    search: function(params){
        this.getProxy().extraParams = params;
        this.loadPage(1);
    }
});