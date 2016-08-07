(function() {

    'use strict';

    angular.module('todo', []);

})();

(function() {
    'use strict';

    angular.module('todo')
        .factory('item', ItemService);

    function ItemService() {
        return {
            getAll: getAll,
            save: save
            // edit: edit
        };
    }

    function getAll() {
        var itemList = JSON.parse(localStorage.getItem('itemList'));
        return itemList;
    }

    function save(item) {
        var itemList = JSON.parse(localStorage.getItem('itemList'));

        var data = {
            text: item.text,
            createdOn: new Date(),
            completed: false
        };

        itemList.push(data);

        localStorage.setItem('itemList', angular.toJson(itemList));

        return data;

    }

    // function edit(text) {
    //     var itemList = JSON.parse(localStorage.getItem('itemList'));
    //
    //     var theFoundItem = null;
    //
    //     if (!text || typeof(text) !== 'string') {
    //         return theFoundItem;
    //     }
    //
    //     itemList.forEach(function findItem(item) {
    //         if (item.text === text) {
    //             theFoundItem = item;
    //         }
    //     });

})();

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

//# sourceMappingURL=main.js.map