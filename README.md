# VintriTestBackend

### Created using Node LTS 18.4.0 and NPM 9.4.2.

## Quick notes
##### - The repo exists online here: https://github.com/yerabashtard/VintriTest
##### - The server/config/config.js file should be viewed to ensure correct configuration before the Server is started.
##### - Run npm install from the root directly to get all required packages
##### - The server can be started using the 'npm start' command from the root directory.
##### - Tests can be run using the 'npm test' command from the root directory.

## Other notes
### Express vs Koa 
##### - I've used both, but decided to go with Express due to it being the defacto standard.

### Database
##### Requirements - I want something super lightweight since this database shouldn't have to do much. I want something embedded into the app so that it will be easier to start up instead of having a whole other database server somewhere. I'm only planning to store a beerId, rating, and comments which would work fine in a SQL database, but I'll look for a NoSQL db because that's what is currently used at Vintri.

##### I took a look at a couple of embedded databases I could use in addition to the one provided in the test requirements:
##### 	https://github.com/petersirka/nosql (MIT license) - Seems like it could work. Small and it has documentation on how to use it.
#####	https://github.com/louischatriot/nedb (MIT license) - Also seems like a fit, but the last update occurred 2 years prior to the nosql database.
#####	https://github.com/google/leveldb (BSD-3-Clause license) - Interesting key-value based datastore similar to Redis. Not really NoSQL though so I'm going to pass.

##### Based on the top three hits when starting the search I'll use https://github.com/petersirka/nosql. There could be a better option, but I'm not going to be too fussy for this project.

### Testing
##### There are so many different frameworks to choose from. A lot of them will definitely work for what I need. Going to use Mocha, Chai, and Sinon as indicated by the test requirements.

### Caching
##### Requirements - Again something lightweight. I won't need to cache much for this project. I don't care too much about whether the cache persists somewhere like in a file or is in-memory and therefore goes away when the server is shut down. I'll go with something that gets a lot of downloads. Downloads might be an indicator of a more stable bug-free project.

#####	https://www.npmjs.com/package/memory-cache (BSD-2-Clause) - Pretty old project, but still used a lot.
#####	https://www.npmjs.com/package/node-localcache (MIT) - Another old project, but not used much.
#####	https://www.npmjs.com/package/node-json-cache (ISC) - Pretty much dead. 1 download last week.
#####	https://www.npmjs.com/package/node-cache (MIT) - Not sure it's being updated anymore as last publish was 3 years ago, but over 2M downloads weekly so I'm going with this one.

### Separate projects for front end and back end vs one project to contain them both
##### In a real world scenario these should be separated. In this case though one project makes sense to make the reveiwing process easier for the Vintri team. After starting off doing them both in one project I've pivoted away from that and made them separate. They are too disparate to include together and it's making development more difficult as I try to imagine how to do things like share resources when none of that is needed.