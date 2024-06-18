# Process Flows
1. [Implementation of `signup`/`login` feature](#implementation-of-signuplogin-feature)
2. [Interaction between modules](#interactions-between-modules)

<br>
<hr>

## Implementation of `signup`/`login` feature
```mermaid
    graph
        subgraph Test Driven Development
            subgraph Models
                USCH[User Schema]
                DES1(establish reference type, validations)
            end
            subgraph Services
                CNTRL[Controllers]
                DES2(update services based on testing)
            end
            subgraph Middleware
                ERR[Error Handler]
                DES3(request log, endpoint, validation)
            end
        end
        subgraph Testing
            PR[REST Client]
        end


        Models <--execute test conditions--> Services
        Services <--update possible errors--> Middleware
        Services <--backend API testing-->Testing
```

<br>
<hr>

# Interactions between modules
```mermaid
graph LR
    subgraph BACKEND
        subgraph SERVER
            I[index.js]
            A[app.js]
        end
        subgraph UTILITIES
            CNF[config.js]
            MW[middleware.js]
        end
        subgraph CONTROLLERS
            REG[signup.js]
            LGN[login.js]
        end
        subgraph MODELS
            U[user.js]
        end
    end
    subgraph DATABASE
        MDB[MongoDB]
    end

    I <--> A
    A <--> REG
    A <--> LGN
    A <--> CNF
    A <--> MW
    CONTROLLERS <--> MODELS
    MODELS <--> DATABASE
```

<br>
<hr>