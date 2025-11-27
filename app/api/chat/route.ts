import { NextRequest, NextResponse } from 'next/server';

const CHATBOT_API_URL = 'https://girl-zone-chatbot.vercel.app/api/chat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required field - only user_message is required
    if (!body.user_message || typeof body.user_message !== 'string' || body.user_message.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'user_message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Use default companion name if not provided
    const companionName = body.companion_name || 'Aria';
    const history = body.history || [];

    // Forward the request to the external chatbot API
    const response = await fetch(CHATBOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_message: body.user_message.trim(),
        companion_name: companionName,
        history: history,
      }),
    });

    // Get response text first to handle both JSON and text responses
    const responseText = await response.text();
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: responseText || 'Failed to get response from chatbot API' };
      }
      
      console.error('Chatbot API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || errorData.error || 'Failed to get response from chatbot API',
          data: errorData 
        },
        { status: response.status }
      );
    }

    // Parse the response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse chatbot API response:', parseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid response from chatbot API',
          data: { rawResponse: responseText }
        },
        { status: 500 }
      );
    }
    
    // Extract response from various possible response formats
    const aiResponse = data.data?.response || data.response || data.message;
    
    if (!aiResponse) {
      console.error('No response found in chatbot API data:', data);
      return NextResponse.json(
        { 
          success: false, 
          message: 'No response received from chatbot API',
          data: data
        },
        { status: 500 }
      );
    }
    
    // Return the response in the expected format
    return NextResponse.json({
      success: true,
      data: {
        response: aiResponse,
      },
    });
  } catch (error) {
    console.error('Error proxying chat request:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      },
      { status: 500 }
    );
  }
}

