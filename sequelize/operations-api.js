
import { Jobs, Companies, Candidates, Profiles } from "./sync.js";
//metoda init are 3 metode:
//1 metoda de autentificare:
async function sequelizeAuth(sequelizeConnection) {//metoda de autentificare la baza de date
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has succesfully connected to the database");
    } catch (err) {
        console.error(`There was an error connecting to the database using sequelize: ${err}`);
    }
}
//dupa ce ne am conectat treb sa definim entitatile pe care sa le inseram in baza de date node ./sequelize/api
//fac o metoda prin care sa le sincronizam in bd
async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: true, alter: true });
        console.log("Sync completed");
    } catch (err) {
        console.error(`Sync failed: ${err}`);
    }
}
//CREARE entitate folosind sequelize==INSERTURI
async function executeInitialDatabasePopulation() {//se executa  popularea initiala a baza de date
    try {
        await Jobs.create({// pt tabela jobs
            Title: "Java developer",
            // NrPositions: 3,
            CompanyP: "Oracle",
            SpecificationsJob: "Junior",
            CityJob: "Bucuresti"
        })
        await Jobs.create({
            Title: "Web developer",
            // NrPositions: 2,
            CompanyP: "Harman",
            SpecificationsJob: "Senior",
            CityJob: "Bucuresti"
        })
        await Companies.create({
            Name: "Harman",
            Employee: 200,
            JobId: 1,
        })
        await Candidates.create({
            //CandidateId: 1,
            Name: "Ion Vasile",
            Age: 35,
            Position: "Java programmer",
            Seniority: 5,
            //  ProfilId: 1,////////
        })
        await Candidates.create({
            Name: "Dragomir Elena",
            Age: 29,
            Position: "c++ programmer",
            Seniority: 10,
        })
        await Profiles.create({
            // ProfilesId: 1,
            Name: "Dragomir Elena",
            Cv: "Cv Ioana",
            CandidateId: 1,
        })
    }
    catch (err) {
        console.error(`There was a problrm populatings the database: ${err}`);
    }
}

//2. metoda 
async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    await executeInitialDatabasePopulation();
}

async function getJobs() {
    try {
        return await Jobs.findAll();
    }
    catch (err) {
        console.log(err);
    }
}
async function getCandidates() {//eu
    try {
        return await Candidates.findAll();
    }
    catch (err) {
        console.log(err);
    }
}
async function getProfiles() {//eu
    try {
        return await Profiles.findAll();
    }
    catch (err) {
        console.log(err);
    }
}

//pt Post
async function createJob(job) {//creez un nou job
    try {
        await Jobs.create({
            Title: job.Title,
            //  NrPositions: job.NrPositions,
            CompanyP: job.CompanyP,
            SpecificationsJob: job.SpecificationsJob,
            CityJob: job.CityJob,
        });
    }
    catch (err) {
        throw err;
    }
}
async function createCandidate(candidate) {
    try {
        await Candidates.create({
            Name: candidate.Name,
            Age: candidate.Age,
            Position: candidate.Position,
            Seniority: candidate.Seniority,
            ProfilId: candidate.Profiles,
        });
    }
    catch (err) {
        throw err;
    }
}

//functie pt delete
async function deleteJob(jobId) {//min 1:25
    try {
        //identificare rand:
        const record = await Jobs.findByPk(jobId);
        //dc randul exista il distruge
        if (record) await record.destroy();

    }
    catch (err) {
        throw err;
    }

}
async function deleteCandidate(candidateId) {//min 1:25
    try {
        const record = await Candidates.findByPk(candidateId);
        if (record) await record.destroy();

    }
    catch (err) {
        throw err;
    }

}

async function updateOrder(jobId, job) {
    try {
        const record = await Jobs.findByPk(jobId);
        if (record) await record.update({
            Title: job.Title,
            //  NrPositions: job.NrPositions,
            CompanyP: job.CompanyP,
            SpecificationsJob: job.SpecificationsJob,
            CityJob: job.CityJob,
        });
    }
    catch (err) {
        throw err;
    }
}
async function updateProfile(profilesId, profile) {
    try {
        const record = await Profiles.findByPk(profilesId);
        if (record) await record.update({
            Name: profile.Name,
            Cv: profile.Cv,
            CandidateId: profile.CandidateId
        });

    }
    catch (err) {
        throw err;
    }
}
async function getJobAtCompany(companyId) {//pt join
    try {
        return await Jobs.findAll({
            include: [{
                model: Companies,
                where: { CompanyId: companyId }
            }]
        })
    } catch (err) {
        console.error(`Eroare la alegerea datelor: ${err}`);
    }
}

async function getCandidateWithProfile(profilesId) {
    try {
        return await Candidates.findAll({
            include: [{
                model: Profiles,
                where: { ProfilesId: profilesId }
            }]
        })
    } catch (err) {
        console.error(`Eroare la alegerea datelor: ${err}`);
    }
}


//export un fisier
export const sequelizeOperationAPI = {
    init: sequelizeInit,
    getJobs: getJobs,
    createJob: createJob,
    deleteJob: deleteJob,
    updateOrder: updateOrder,
    getJobAtCompany: getJobAtCompany,
    createCandidate: createCandidate,
    getCandidates: getCandidates,
    deleteCandidate: deleteCandidate,
    getProfiles: getProfiles,
    updateProfile: updateProfile,
    getCandidateWithProfile: getCandidateWithProfile,
};