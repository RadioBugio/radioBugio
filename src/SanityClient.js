import { createClient } from '@sanity/client';


const sanityClient = createClient({
	projectId: '7qk9kofv',
	dataset: 'production',
	apiVersion: '2023-10-25',
	useCdn: false,
});

export default sanityClient;

