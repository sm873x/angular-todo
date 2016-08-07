(function() {

    'use strict';

    angular.module('todo')
        .controller('ListController', ListController);

    ListController.$inject = ['item'];

    function ListController(ItemService) {
        this.itemlist = ItemService.getAll();

        this.newItem = {};
        this.addToList = function addToList(item) {
            ItemService.save(item);

        };

        this.editedItem = {};
        this.editItem = function editItem(editedItem) {
            ItemService.save(editedItem);
        };

        this.deleteItem = function deleteItem() {

        };


    }
})();
