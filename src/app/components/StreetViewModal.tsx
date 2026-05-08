import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { X, AlertTriangle, Eye, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useLanguage } from '../../contexts/LanguageContext';

interface StreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  region: {
    name: string;
    coordinates: { lat: number; lng: number };
    cities: string[];
  } | null;
}

export function StreetViewModal({ isOpen, onClose, region }: StreetViewModalProps) {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streetViewAvailable, setStreetViewAvailable] = useState(false);

  useEffect(() => {
    if (!isOpen || !region) return;

    const initializeStreetView = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // You'll need to add your Google Maps API key here
        // Vite requires VITE_ environment variables and uses import.meta.env
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
          version: 'weekly',
          libraries: ['geometry'],
        });

        const { google } = await loader.load();

        if (mapRef.current && streetViewRef.current) {
          const location = new google.maps.LatLng(region.coordinates.lat, region.coordinates.lng);

          // Check if Street View is available at this location
          const streetViewService = new google.maps.StreetViewService();
          const streetViewResponse = await new Promise<google.maps.StreetViewResponse>((resolve, reject) => {
            streetViewService.getPanorama({
              location: location,
              radius: 50000 // 50km radius to find nearby Street View
            }, (data, status) => {
              if (status === google.maps.StreetViewStatus.OK) {
                resolve(data);
              } else {
                reject(status);
              }
            });
          });

          setStreetViewAvailable(true);

          // Initialize Street View
          const streetView = new google.maps.StreetViewPanorama(streetViewRef.current, {
            position: streetViewResponse.location?.latLng || location,
            pov: { heading: 34, pitch: 10 },
            zoom: 1,
            enableCloseButton: false,
            addressControl: false,
            linksControl: true,
            panControl: true,
            zoomControl: true,
            fullscreenControl: false,
          });

          // Initialize mini map
          const map = new google.maps.Map(mapRef.current, {
            center: location,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true,
          });

          // Add marker for the region
          new google.maps.Marker({
            position: location,
            map: map,
            title: region.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#E24B4A',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }
          });

          // Add Street View location marker
          if (streetViewResponse.location?.latLng) {
            new google.maps.Marker({
              position: streetViewResponse.location.latLng,
              map: map,
              title: 'Street View Location',
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: '#639922',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }
            });
          }

        }
      } catch (err) {
        console.error('Street View initialization error:', err);
        setError(
          'Street View is not available for this location or the Google Maps API key is missing/invalid. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.'
        );
        setStreetViewAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStreetView();
  }, [isOpen, region]);

  if (!isOpen || !region) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-[#1a3a5c]" />
            <div>
              <h2 className="text-xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
                {t("streetview.title")} - {region.name}
              </h2>
              <p className="text-sm text-gray-600">
                Cities: {region.cities.join(', ')}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Privacy Notice */}
        <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-200">
          <Alert className="border-yellow-200 bg-transparent">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 text-sm">
              <strong>{t("common.privacyNotice")}:</strong> {t("streetview.privacyNotice")}
            </AlertDescription>
          </Alert>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[600px]">
          {/* Street View */}
          <div className="flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a3a5c] mx-auto mb-4"></div>
                  <p className="text-gray-600">{t("streetview.loading")}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md px-6">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t("streetview.unavailable")}</h3>
                  <p className="text-gray-600 text-sm mb-4">{error}</p>
                  <p className="text-xs text-gray-500">
                    {t("streetview.unavailableMessage")}
                  </p>
                </div>
              </div>
            )}

            <div
              ref={streetViewRef}
              className="w-full h-full"
              style={{ display: error ? 'none' : 'block' }}
            />
          </div>

          {/* Mini Map */}
          <div className="w-full lg:w-80 border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-[#1a3a5c] mb-2">{t("streetview.regionalOverview")}</h3>
              <p className="text-sm text-gray-600">
                Showing approximate location for {region.name} region.
                Street View imagery may be from nearby available locations.
              </p>
            </div>
            <div
              ref={mapRef}
              className="w-full h-64 lg:h-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            <strong>{t("common.note")}:</strong> {t("streetview.note")}
          </div>
          <Button onClick={onClose} className="bg-[#1a3a5c] hover:bg-[#2a4a6c]">
            {t("streetview.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}