Ext.define('POS.custom.grid.PurchasedProduct', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid-purchased-product',
    
    columnLines: true,
    features: [{
        ftype: 'summary'
    }],
    selType: 'rowmodel',
    
    minHeight: 150,
    maxHeight: 475,    
    
    initComponent: function(){
        this.columns = [
            Ext.create('Ext.grid.RowNumberer', {
                width: 50
            }),
            {header: 'Produk', dataIndex: 'product_name', width:310, sortable: false},
            {header: 'Jumlah', dataIndex: 'purchased_amount', width:85, sortable: false, align: 'right'},
            {header: 'Satuan', dataIndex: 'unit_name', width: 100, sortable: false,
                summaryRenderer: function(value) {
                    return '<strong>Total</strong>';
                }
            },
            {header: 'Total', dataIndex: 'purchased_total', width: 150, sortable: false, renderer: Ext.fn.Render.currency, align: 'right',
                summaryType: 'sum',
                summaryRenderer: function(value) {
                    return '<strong>' + Ext.fn.Render.currency(value) + '</strong>';
                }
            }
        ];
        
        this.callParent(arguments);
    }
});