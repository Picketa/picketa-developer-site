import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { DEFAULT_OG_TITLE, DEFAULT_OG_DESCRIPTION } from '@/lib/constants';
import SmallLogo from './small-logo';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || DEFAULT_OG_TITLE;
    const description = searchParams.get('description') || DEFAULT_OG_DESCRIPTION;
    const authorName = searchParams.get('authorName');
    const authorPicture = searchParams.get('authorPicture');
    const authorRole = searchParams.get('authorRole');

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, white 0%, #6bd07a 100%)',
            padding: '60px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SmallLogo width={140} height={140} />
            <div style={{ 
              marginLeft: '0.2em', 
              fontSize: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2em'
            }}>
              <strong style={{ color: '#1E1E1E' }}>Picketa</strong>
              <strong style={{ color: '#666666' }}>for</strong>
              <strong style={{ color: '#666666' }}>Developers</strong>
            </div>
          </div>

          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            marginTop: '40px',
            flex: 1,
          }}>
            <div style={{ 
              fontSize: '48px',
              color: '#1E1E1E',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}>
              {title}
            </div>
            <div style={{ 
              fontSize: '24px',
              color: '#666666',
              lineHeight: 1.5,
              display: 'flex',
            }}>
              {description}
            </div>
          </div>

          {authorName && authorPicture && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              marginTop: '40px',
            }}>
              <img
                src={authorPicture}
                alt={authorName}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '24px',
                }}
              />
              <div style={{ 
                marginLeft: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ 
                  fontSize: '36px',
                  color: '#666666',
                }}>
                  {authorName}
                </span>
                {authorRole && (
                  <span style={{ 
                    fontSize: '24px',
                    color: '#666666',
                    opacity: 0.8,
                  }}>
                    {authorRole}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await fetch(
              new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZFhjQ.ttf')
            ).then((res) => res.arrayBuffer()),
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    console.log(errorMessage);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
