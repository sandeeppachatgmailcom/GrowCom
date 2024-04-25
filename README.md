clean code implementation 



Src
|
|-Entity_Layer
|   |
|   |-Models
|   |  |-___Model.ts
|   |
|   |
|   |-Repository
|   |   |-___Repository.ts
|   |
|   |
|   |-Services
|   |  |-___Services.ts
|   |
|   |
|   |-Types
|   |  |-___Types.ts
|   |
|   |
|   |-UseCases
|      |-___UseCases.ts
|
|-UseCases_Layer
|   |
|   |-UseCases->implements as Sockets
|
|
|
|-Interface Layer
|   |
|   |-Controllers->
|   |
|   |-Apis->
|
|
|
|
|-FramWorks Layer
|   |-Dependency Injection 
|   |  |- injecting power to the controller by creating instances 
|   |
|   |
|   |
|   |
|   |-Model
|   |  |
|   |  |-Entity_Model- implements as adapter
|   |  
|   |-Repository
|   |  |-Entity_Repository- implements as adapter
|   |  | 
|   |   
|   |-Routes
|   |  |-Router - Communicates with Controllers in Dependency
|   |  | 
|   |  
|   |-Services
|   |  |-Entity_Services- implements as adapter
|   |  | 
|   |  | 


