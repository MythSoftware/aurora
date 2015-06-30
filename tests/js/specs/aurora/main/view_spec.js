define([
    'app',
    "aurora/main/view"
], function() {

    describe("aurora/main/view", function() {

        //var layout = new SCL.Main.Layout();

        beforeEach(function() {
            spyOn(layout, 'generateSelect').and.callThrough();
            layout.onRender();
        });

        it("should have called generateSelect on render", function() {
            expect(layout.generateSelect).toHaveBeenCalled();
        });

    });

});