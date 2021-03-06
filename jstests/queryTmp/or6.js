t = db.jstests_or6;
t.drop();

t.ensureIndex( {a:1} );

// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:{$gt:2}},{a:{$gt:0}}]} ).itcount());
assert.eq(0, t.find( {$or:[{a:{$lt:2}},{a:{$lt:4}}]} ).itcount());

// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:{$gt:2,$lt:10}},{a:{$gt:0,$lt:5}}]} ).itcount());

// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:{$gt:2,$lt:10}},{a:{$gt:0,$lt:15}}]} ).itcount());

// no separate clauses
// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:{$gt:2,$lt:10}},{a:{$gt:3,$lt:5}}]} ).itcount());

// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:{$gt:2,$lt:10}},{a:{$gt:3,$lt:5}},{a:{$gt:20}}]} ).itcount());

// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:1},{b:2}]} ).hint( {a:1} ).itcount());
assert.eq(0, t.find( {$or:[{a:1},{a:3}]} ).hint( {a:1} ).itcount());
assert.eq(0, t.find( {$or:[{a:1},{a:3}]} ).hint( {$natural:1} ).itcount());

// NEW QUERY EXPLAIN
assert.eq( 0, t.find( {$or:[{a:{$gt:1,$lt:5},b:6}, {a:3,b:{$gt:0,$lt:10}}]} ).itcount());

t.ensureIndex( {b:1} );
assert.eq(0, t.find( {$or:[{a:1,b:5},{a:3,b:5}]} ).hint( {a:1} ).itcount());

t.drop();

t.ensureIndex( {a:1,b:1} );
// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:{$in:[1,2]},b:5}, {a:2,b:6}]} ).itcount());
assert.eq(0, t.find( {$or:[{a:{$gt:1,$lte:2},b:5}, {a:2,b:6}]} ).itcount());
assert.eq(0, t.find( {$or:[{a:{$gt:1,$lte:3},b:5}, {a:2,b:6}]} ).itcount());
assert.eq(0, t.find( {$or:[{a:{$in:[1,2]}}, {a:2}]} ).itcount());

// NEW QUERY EXPLAIN
assert.eq(0, t.find( {$or:[{a:{$gt:1,$lt:5},b:{$gt:0,$lt:3},c:6}, {a:3,b:{$gt:1,$lt:2},c:{$gt:0,$lt:10}}]} ).itcount());
assert.eq(0, t.find( {$or:[{a:{$gt:1,$lt:5},c:6}, {a:3,b:{$gt:1,$lt:2},c:{$gt:0,$lt:10}}]} ).itcount());
assert.eq(0, t.find( {$or:[{a:{$gt:1,$lt:5},b:{$gt:0,$lt:3},c:6}, {a:3,b:{$gt:1,$lt:4},c:{$gt:0,$lt:10}}]} ).itcount());
/* NEW QUERY EXPLAIN
assert.eq( 3, exp.clauses[ 1 ].indexBounds.b[ 0 ][ 0 ] );
*/
/* NEW QUERY EXPLAIN
assert.eq( 4, exp.clauses[ 1 ].indexBounds.b[ 0 ][ 1 ] );
*/
