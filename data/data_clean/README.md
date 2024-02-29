# loading data

``` bash
docker run \
    --restart always \
    --publish=7474:7474 --publish=7687:7687 \
    --env NEO4J_AUTH=neo4j/password \
    --volume=/Users/ron/Desktop/neo4jdata:/data \
    --volume=/Volumes/DevStorage/github/rlhatcher/ronaldhatcherblog/data/data_clean:/import \
    neo4j:5.16.0
```
