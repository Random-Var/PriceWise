"use client";
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url : string) => {
    try{
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        if (hostname.includes('amazon.') || hostname.endsWith('amazon')){
            return true;
        }
        return false;
    }
    catch (e){
        return false;
    }
}

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt);

        if (!isValidLink) return alert('Please provide a valid Amazon link');

        try{
            setLoading(true);

            // Scrape the page
            const product = await scrapeAndStoreProduct(searchPrompt);
        }
        catch(e){}
        finally{
            setLoading(false);
        }
    };

    return (
        <form
            className='flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input 
            type="text" 
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            placeholder='Enter product link' 
            className='searchbar-input'
            />

            <button 
            type='submit' 
            className='searchbar-btn'
            disabled={searchPrompt===''}
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    )
}

export default Searchbar;