cluster=new ShardingTest ({shards: 3, chunksize:1})

targetDb="torneo_tejo_col"
db = (new Mongo("localhost:20006")).getDB(targetDb) 
for (i= 0; i < 1000000; i++) {
  db.encuentros.insertOne({
    fecha: new Date("2023-03-15T10:00:00Z"),
    equipos: [
      {
        nombre: "Equipo "+i,
        puntos: 27,
        equipo_id: ObjectId("64128579a9c089b29416f9aa"),
      },
      {
        nombre: "Equipo 1"+i,
        puntos: 15,
        equipo_id: ObjectId("64128579a9c089b29416f9ab"),
      },
    ],
    arbitro: ObjectId("6412859da9c089b29416f9b2"),
  });
  
    }
shard1 = new Mongo("localhost:20000").getDB(targetDb) 
shard2 = new Mongo("localhost:20001").getDB(targetDb) 
shard3 = new Mongo("localhost:20002").getDB(targetDb) 

shard1.encuentros.count()
shard2.encuentros.count()
shard3.encuentros.count()
    
sh.status()
sh.enableSharding(targetDb)
sh.shardCollection(targetDb+".encuentros", {_id: 1})
sh.getBalancerState()
sh.setBalancerState(true)
