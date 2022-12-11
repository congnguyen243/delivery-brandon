const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const projectId = 'projects/155153268468';

async function authenticateApi(key = '') {
    const [accessResponse] = await client.accessSecretVersion({
        name: `${projectId}/secrets/ApiSecretKey/versions/1`,
    });

    const responsePayload = accessResponse.payload.data.toString('utf8');
    return responsePayload == key;
}

module.exports = {
    authenticateApi,
};