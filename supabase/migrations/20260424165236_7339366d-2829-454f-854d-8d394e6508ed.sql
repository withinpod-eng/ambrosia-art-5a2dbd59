
DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can create orders" ON public.orders;

CREATE POLICY "Public can create valid bookings" ON public.bookings
  FOR INSERT WITH CHECK (
    length(trim(full_name)) BETWEEN 2 AND 80
    AND length(trim(phone)) BETWEEN 7 AND 20
    AND party_size BETWEEN 1 AND 30
    AND booking_date >= CURRENT_DATE
    AND status = 'pending'
  );

CREATE POLICY "Public can create valid orders" ON public.orders
  FOR INSERT WITH CHECK (
    length(trim(customer_name)) BETWEEN 2 AND 80
    AND length(trim(customer_phone)) BETWEEN 7 AND 20
    AND jsonb_typeof(items) = 'array'
    AND jsonb_array_length(items) > 0
    AND subtotal_inr > 0
    AND total_inr > 0
    AND status = 'pending'
  );
