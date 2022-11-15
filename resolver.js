const db = require('./db');

const Query = {
    job: (_root, { id }) => db.jobs.get(id),
    jobs: () => db.jobs.list(),
    company: (_root, { id }) => db.companies.get(id)
};

const Job = {
    company: (job) => {
        return db.companies.get(job.companyId);
    }
};

const Company = {
    jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
};

const Mutation = {
    createJob: (_root, args, context) => {
        if (!context.user) {
            throw new Error('unauthorized');
        }
        const jobId = db.jobs.create({ ...args.input, companyId: context.user.companyId });
        return db.jobs.get(jobId);
    },

};


module.exports = { Query, Mutation, Job, Company };