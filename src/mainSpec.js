import LevelDeserializer from './LevelDeserializer';
import Entity from './Entity';

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });

    it("should dezerialize first level", function() {

        var result = LevelDeserializer(0);

        expect(result.gravity).toBe(0.5);

        var entities = result.entities;

        expect(entities[0]).toEqual(new Entity( 100, 10, 10, 10, 0, 0, 0, 0, 'circle', 'red', true, true));
        expect(entities[1]).toEqual(new Entity( 0, 185, 500, 10, 0, 0, 0, -0.2, 'square', 'blue', false, false));
        expect(entities[2]).toEqual(new Entity( 500, 0, 10, 185, 0, 0, 0, 0, 'square', 'grey', false, false));

    });
});