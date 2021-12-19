import "./sync.js";
import { router } from "../server-init.js";
import { sequelizeOperationAPI } from "./operations-api.js";

//prima Ruta pentru jobs -RUTA GET-//http://localhost:8080/api/sequelize/jobs
router.route("/sequelize/jobs").get(async function getSequelizeJobs(_, response) {
    const result = await sequelizeOperationAPI.getJobs();
    response.status(200).json(result);
})
///Ruta get pt candidati http://localhost:8080/api/sequelize/candidates
router.route("/sequelize/candidates").get(async function getSequelizeCandidates(_, response) {
    const result = await sequelizeOperationAPI.getCandidates();
    response.status(200).json(result);
})
///Ruta get pt profiles
router.route("/sequelize/profiles").get(async function getSequelizeProfiles(_, response) {
    const result = await sequelizeOperationAPI.getProfiles();
    response.status(200).json(result);
})

//Ruta de POST= creeare un job nou din Postman
router.route("/sequelize/jobs")
    .post(async function createJob({ body }, response) {
        try {

            if (JSON.stringify(body) == "{}" || body === undefined || body === null) {
                response.status(400).json("Incorect! Jobul nu este definit corespunzator");

            }
            else {
                await sequelizeOperationAPI.createJob(body);
                response.status(200).json("succes!");
            }
        }

        catch (err) {
            console.error(`eroare la apelarea API: ${err}`);
        }
    });

//Ruta de POST= creeare un candidat nou din Postman pt Candidates
router.route("/sequelize/candidates").post(async function createCandidate({ body }, response) {
    try {
        if (JSON.stringify(body) == "{}" || body === undefined || body === null) {
            response.status(400).json("Incorect! Candidatul nu este definit corespunzator");
        }
        else {
            await sequelizeOperationAPI.createCandidate(body);
            response.status(200).json("S-a creat candidatul!");
        }
    }
    catch (err) {
        console.error(`eroare la apelarea API: ${err}`);
    }
});

// //Ruta de Stergere comanda- din postman
router.route("/sequelize/jobs/:jobId").delete(async function deleteJob({ params: { jobId } }, response) {
    try {

        if (jobId === undefined || jobId <= 0) {
            response.status(500).json("Incorect! Introduceti cifre mai mari de 0");
        }
        else {
            await sequelizeOperationAPI.deleteJob(+jobId);//+ ul il face nr din String //conversie la nr, e string
            response.status(200).json("Succes! S-a sters jobul selectat");
        }
    }
    catch (err) {
        console.error(`eEroare la apelarea API: ${err}`);
    }
})


//Ruta de Stergere comanda-- candidati
router.route("/sequelize/candidates/:candidateId").delete(async function deleteCandidate({ params: { candidateId } }, response) {
    try {
        if (candidateId === undefined || candidateId <= 0 || candidateId === null) {
            response.status(500).json("Incorect! Introduceti cifre mai mari de 0");
        } else {
            await sequelizeOperationAPI.deleteCandidate(+candidateId);//+ ul il face nr din String //conversie la nr , e string
            response.status(200).json("Succes! S-a sters candidatul selectat");
        }
    }
    catch (err) {
        console.error(`Eroare la apelarea API: ${err}`);
    }
})
//Ruta UPDATE, actualizare resursa dupa id job
router.route("/sequelize/jobs/:jobId").put(async function updateOrder({ params: { jobId }, body }, response) {
    try {
        if (jobId === undefined || jobId <= 0) {
            response.status(500).json("Incorect! Introduceti cifre mai mari de 0");
        } else {
            await sequelizeOperationAPI.updateOrder(+jobId, body);//+ ul il face nr din String //conversie la nr , e string
            response.status(200).json("Succes!");
        }
    }
    catch (err) {
        console.error(`Eroare la apelarea API: ${err}`);
    }
})

//Ruta UPDATE
router.route("/sequelize/profiles/:profilesId").put(async function updateProfile({ params: { profilesId }, body }, response) {

    try {
        if (profilesId === undefined || profilesId <= 0) {
            response.status(400).json("Incorect! Jobul nu este definit corespunzator");
        }
        else {
            await sequelizeOperationAPI.updateProfile(+profilesId, body);//+ ul il face nr din String //conversie la nr , e string
            response.status(200).json("Succes!");
        }
    }
    catch (err) {
        console.error(`Eroare la apelarea API: ${err}`);
    }
})

//Ruta join- job si companii
router.route("/sequelize/jobAtCompany/:companyId").get(async function getJobAtCompany({ params: { companyId } }, response) {

    const result = await sequelizeOperationAPI.getJobAtCompany(+companyId);
    response.status(200).json(result);
})

// //Ruta join- candidati si profile
router.route("/sequelize/candidateWithProfile/:profilesId").get(async function getCandidateWithProfile({ params: { profilesId } }, response) {

    const result = await sequelizeOperationAPI.getCandidateWithProfile(+profilesId);
    response.status(200).json(result);
})